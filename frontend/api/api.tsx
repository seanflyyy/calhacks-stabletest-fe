export async function getImageFromApi(url: string): Promise<{
  result: string;
  status: number;
}> {
  const response = await fetch(url) // Replace with the actual API route
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok');
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        return {
          result: url,
          status: 200
        }
      })
      .catch((error) => {
        console.error('Error fetching image:', error)
        return {
          result: '',
          status: 404
        }
    });

    return response
}

