interface CommonHeader {
  Authorization: string;
}

const commonHeader = (): CommonHeader => {
  const accessToken = localStorage.getItem('@t10-challenge:accessToken');
  return { Authorization: `Bearer ${accessToken}`.replace(/['"]+/g, '') };
};

export { commonHeader };
