class Http {
  static instance = new Http();
  get = async (url) => {
    try {
      let req = await fetch(url);

      let json = await req.json();

      return json;
    } catch (error) {
      console.log('Http get methods error:', error);

      throw Error(error);
    }
  };

  post = async (url) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });

      let json = await req.json();

      return json;
    } catch (error) {
      console.log('Http get methods error:', error);

      throw Error(error);
    }
  };
}

export default Http;
