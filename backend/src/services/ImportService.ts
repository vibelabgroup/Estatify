import { PrismaClient } from '@prisma/client';
import { Readable } from 'stream';
import csv from 'csv-parser';

const prisma = new PrismaClient();

export interface ImportResult {
  imported: number;
  updated: number;
  failed: number;
  errors: string[];
  total: number;
}

export class ImportService {
  async importLeads(csvData: string, source: string = 'import'): Promise<ImportResult> {
    const leads: any[] = [];
    const errors: string[] = [];
    let lineNumber = 0;

    return new Promise((resolve) => {
      const stream = Readable.from(csvData).pipe(csv());

      stream.on('data', (row: any) => {
        lineNumber++;
        
        try {
          if (!row.email || !this.isValidEmail(row.email)) {
            errors.push(`Line ${lineNumber}: Invalid email address`);
            return;
          }

          const lead = {
            email: row.email.toLowerCase().trim(),
            firstName: row.first_name || row.firstName || null,
            lastName: row.last_name || row.lastName || null,
            phone: row.phone || null,
            company: row.company || null,
            source,
            customFields: row,
            tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
          };

          leads.push(lead);
        } catch (error) {
          errors.push(`Line ${lineNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      });

      stream.on('end', async () => {
        let imported = 0;
        let updated = 0;
        let failed = 0;

        for (const lead of leads) {
          try {
            const existing = await prisma.lead.findUnique({
              where: { email: lead.email },
            });

            if (existing) {
              await prisma.lead.update({
                where: { email: lead.email },
                data: {
                  firstName: lead.firstName || existing.firstName,
                  lastName: lead.lastName || existing.lastName,
                  phone: lead.phone || existing.phone,
                  company: lead.company || existing.company,
                  customFields: JSON.stringify({ 
                    ...JSON.parse(existing.customFields || '{}'), 
                    ...JSON.parse(lead.customFields || '{}') 
                  }),
                  tags: JSON.stringify([...new Set([
                    ...(JSON.parse(existing.tags || '[]') as string[]),
                    ...(JSON.parse(lead.tags || '[]') as string[])
                  ])])
                },
              });
              updated++;
            } else {
              await prisma.lead.create({
                data: lead,
              });
              imported++;
            }
          } catch (error: any) {
            failed++;
            errors.push(`Failed to import ${lead.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

        resolve({
          imported,
          updated,
          failed,
          errors,
          total: leads.length,
        });
      });

      stream.on('error', (error: Error) => {
        errors.push(`CSV parsing error: ${error.message}`);
        resolve({
          imported: 0,
          updated: 0,
          failed: 0,
          errors,
          total: 0,
        });
      });
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async exportLeads(filters: any = {}): Promise<string> {
    const leads = await prisma.lead.findMany({
      where: filters,
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        company: true,
        status: true,
        source: true,
        tags: true,
        score: true,
        createdAt: true,
      },
    });

    const headers = ['email', 'first_name', 'last_name', 'phone', 'company', 'status', 'source', 'tags', 'score', 'created_at'];
    const rows = leads.map((lead: any) => [
      lead.email,
      lead.firstName || '',
      lead.lastName || '',
      lead.phone || '',
      lead.company || '',
      lead.status,
      lead.source,
      lead.tags.join(','),
      lead.score,
      lead.createdAt.toISOString(),
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    return csv;
  }
}
