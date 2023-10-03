export const GetCotizacion = async () => {
  try {
    const resp = await fetch("http://localhost:8000/quote", {
      method: "GET",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoiVFZSWk5VNXFUVEJPVkUwMVRWRTlQUT09IiwiZXhwaXJlIjoiVFZSWk5VNXFVWHBOVkdNMVRWRTlQUT09IiwidXNlcklkIjoiVFZFOVBRPT0ifQ.L_xMQ_FGxtNe0pRf-KZR16Hy3WoJW4yeaG8qfgqwJF8",
      },
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const PostCotizacion = async (cotizacion) => {
  try {
    const resp = await fetch("http://localhost:8000/quote", {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoiVFZSWk5VNXFUVEJPVkUwMVRWRTlQUT09IiwiZXhwaXJlIjoiVFZSWk5VNXFVWHBOVkdNMVRWRTlQUT09IiwidXNlcklkIjoiVFZFOVBRPT0ifQ.L_xMQ_FGxtNe0pRf-KZR16Hy3WoJW4yeaG8qfgqwJF8",
      },
      body: JSON.stringify(cotizacion)
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

