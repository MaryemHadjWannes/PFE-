import React from 'react';

const AdminAccess = () => {
  return (
    <div style={{ backgroundColor: '#16c936', padding: '5px', color: '#fff', textAlign: 'center', marginTop: '100px', borderRadius: '10px', fontFamily: 'Courier New' }}>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Only administrators can access this page.</p>
    </div>
  );
}

export default AdminAccess;
