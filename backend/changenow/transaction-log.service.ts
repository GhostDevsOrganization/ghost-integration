import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface TransactionLog {
  id: string;
  timestamp: string;
  userAddress: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'kyc_required';
  kycStatus?: 'not_required' | 'pending' | 'approved' | 'rejected';
  errorMessage?: string;
  changeNowResponse?: {
    id: string;
    status: string;
    payinAddress?: string;
    payoutAddress?: string;
  };
}

@Injectable()
export class TransactionLogService {
  private readonly logFilePath = path.join(__dirname, 'transaction-log.json');

  constructor() {
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, '[]');
    }
  }

  async logTransaction(transaction: Omit<TransactionLog, 'timestamp'>) {
    const logs = this.getLogs();
    const logEntry = {
      ...transaction,
      timestamp: new Date().toISOString(),
    };
    logs.push(logEntry);
    fs.writeFileSync(this.logFilePath, JSON.stringify(logs, null, 2));
    return logEntry;
  }

  getLogs(filter?: Partial<TransactionLog>) {
    const logs: TransactionLog[] = JSON.parse(
      fs.readFileSync(this.logFilePath, 'utf8')
    );
    if (!filter) return logs;
    return logs.filter((log) =>
      Object.entries(filter).every(([key, value]) => log[key] === value)
    );
  }

  exportLogs(format: 'json' | 'csv') {
    const logs = this.getLogs();
    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    }
    // Convert to CSV
    const headers = Object.keys(logs[0] || {});
    const rows = logs.map((log) =>
      headers.map((header) => JSON.stringify(log[header])).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
}