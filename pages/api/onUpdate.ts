// File: utils/onUpdate.ts
const onUpdate = async (id: string, name: string, price: number, isVisible: boolean) => {
    const response = await fetch('/api/updateProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, price, isVisible }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Could not update product.');
    }
  
    return data;
  };
  
export default onUpdate;