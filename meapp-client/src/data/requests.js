export const getBlob = async (blobName) => {
  try {
      const encodedBlobName = encodeURIComponent(blobName);
      const response = await fetch(`https://meapp-api.mea.bsmch.net/get_blob`, {
      // const response = await fetch(`http://127.0.0.1:5000/get_blob`, {
          method: 'GET',
          headers: {
              'Accept': 'application/octet-stream',
              'Content-Type': 'application/octet-stream',
              'Blob-Name': encodedBlobName
          }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch blob data');
      }

      const blobData = await response.blob();
      const url = URL.createObjectURL(blobData);
      return url;
  } catch (error) {
      console.log(error)
      console.log('using wierd branch')
  }
}

export const getWaitingProducts = async () => {
  try {
      const response = await fetch(`https://meapp-api.mea.bsmch.net/get_waiting_products`, {
      // const response = await fetch(`http://127.0.0.1:5000/get_waiting_products`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      let data = response.json()
      return await data
  } catch (error) {
      console.log(error)
      console.log('using wierd branch')
  }
}

export const getProducts = async () => {
    try {
        const response = await fetch(`https://meapp-api.mea.bsmch.net/get_data`, {
        // const response = await fetch(`http://127.0.0.1:5000/get_data`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        let data = response.json()
        return await data
    } catch (error) {
        console.log(error)
        console.log('using wierd branch')
    }
}

export const postNewBlob = async (toBlobPost) => {  
  try {
    const formData = new FormData();
    formData.append('file', toBlobPost.blob, toBlobPost.name);

    const response = await fetch(`https://meapp-api.mea.bsmch.net/post_images`, {      
    // const response = await fetch(`http://127.0.0.1:5000/post_images`, {      
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error posting new product');
  }
};

export const postNewProduct = async (toProductPost) => {
  try {
    const response = await fetch(`https://meapp-api.mea.bsmch.net/post_new_product`, {
    // const response = await fetch(`http://127.0.0.1:5000/post_new_product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toProductPost)
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = response;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error posting new product');
  }
};

export const postNewApprove = async (productName) => {
  try {
    const response = await fetch(`https://meapp-api.mea.bsmch.net/post_new_approve`, {
    // const response = await fetch(`http://127.0.0.1:5000/post_new_approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({product_name: productName})
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = response;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error posting new product');
  }
};
