

const authHeader = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
  };
}

export default authHeader