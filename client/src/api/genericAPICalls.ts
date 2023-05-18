//Any fetch call should probably follow this pattern. URL for fetch provided as param
const genFetch = (URL: string) => {
  return fetch(URL).then((response) => {

    return response.json();
  }).then((json) => {
    return json;
  })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export { genFetch };
