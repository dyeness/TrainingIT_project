// js/database.js - Database management for form submissions

export class FormDatabase {
  constructor() {
    this.dbName = 'go-west-forms';
    this.initDB();
  }

  initDB() {
    if (!localStorage.getItem(this.dbName)) {
      localStorage.setItem(this.dbName, JSON.stringify([]));
    }
  }

  // Add new form submission to database
  addSubmission(data) {
    const submissions = this.getAllSubmissions();
    const newSubmission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: data.name,
      phone: data.phone
    };
    submissions.push(newSubmission);
    localStorage.setItem(this.dbName, JSON.stringify(submissions));
    return newSubmission;
  }

  // Get all submissions
  getAllSubmissions() {
    try {
      const data = localStorage.getItem(this.dbName);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading database:', error);
      return [];
    }
  }

  // Get submission by ID
  getSubmission(id) {
    const submissions = this.getAllSubmissions();
    return submissions.find(s => s.id === id);
  }

  // Delete submission by ID
  deleteSubmission(id) {
    let submissions = this.getAllSubmissions();
    submissions = submissions.filter(s => s.id !== id);
    localStorage.setItem(this.dbName, JSON.stringify(submissions));
  }

  // Clear all submissions
  clearAll() {
    localStorage.setItem(this.dbName, JSON.stringify([]));
  }

  // Export data as JSON
  exportData() {
    const submissions = this.getAllSubmissions();
    return JSON.stringify(submissions, null, 2);
  }

  // Export data as CSV
  exportAsCSV() {
    const submissions = this.getAllSubmissions();
    if (submissions.length === 0) return '';

    const headers = ['ID', 'Name', 'Phone', 'Timestamp'];
    const rows = submissions.map(s => [
      s.id,
      s.name,
      s.phone,
      s.timestamp
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  // Get submissions count
  getCount() {
    return this.getAllSubmissions().length;
  }
}

// Create global database instance
export const db = new FormDatabase();
