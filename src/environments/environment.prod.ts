export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://ec2-3-138-189-139.us-east-2.compute.amazonaws.com:8081",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://ec2-3-138-189-139.us-east-2.compute.amazonaws.com:4200',
  },
};
