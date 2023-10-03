export const GetProductos = async () => {
  try {
    const resp = await fetch("http://localhost:8000/products", {
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
