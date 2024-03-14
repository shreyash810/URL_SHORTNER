import axios from "axios";
import Hero from "../component/Navbar/hero/Hero";
import Table from "../component/Navbar/table/Table";

function Home() {
  const handelDelete = (id) => {
    const config = {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    };

    axios
      .post(
        `url-shortnerapi-f1hst2ou8-sams-projects-daccedfc.vercel.app/delete/${id}`,
        config
      )
      .then((response) => {
        console.log(response.data.msg);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Hero />
      <Table handelDelete={handelDelete} />
    </div>
  );
}

export default Home;
