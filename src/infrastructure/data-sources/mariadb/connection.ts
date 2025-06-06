// This is a simplified example of a database connection
// In a real application, you would use a proper database client like mysql2 or mariadb

export const db = {
  query: async (sql: string, params: any[] = []): Promise<any> => {
    console.log(`Executing query: ${sql} with params: ${JSON.stringify(params)}`);
    
    // This is a mock implementation
    // In a real application, this would connect to a MariaDB instance
    
    // For demonstration purposes, we'll return mock data
    if (sql.includes('SELECT') && sql.includes('WHERE id =')) {
      return [{
        id: params[0],
        client_id: 'client123',
        address: 'Sample Address',
        latitude: 10.123,
        longitude: 20.456,
        expected_depth: 100,
        actual_depth: null,
        status: 'pending',
        start_date: new Date(),
        completion_date: null
      }];
    }
    
    if (sql.includes('SELECT') && sql.includes('WHERE client_id =')) {
      return [
        {
          id: 'project_1',
          client_id: params[0],
          address: 'Sample Address 1',
          latitude: 10.123,
          longitude: 20.456,
          expected_depth: 100,
          actual_depth: null,
          status: 'pending',
          start_date: new Date(),
          completion_date: null
        },
        {
          id: 'project_2',
          client_id: params[0],
          address: 'Sample Address 2',
          latitude: 11.123,
          longitude: 21.456,
          expected_depth: 150,
          actual_depth: 145,
          status: 'completed',
          start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          completion_date: new Date()
        }
      ];
    }
    
    if (sql.includes('INSERT INTO')) {
      return {
        insertId: 'project_' + Math.floor(Math.random() * 1000)
      };
    }
    
    if (sql.includes('UPDATE')) {
      return { affectedRows: 1 };
    }
    
    return [];
  }
};