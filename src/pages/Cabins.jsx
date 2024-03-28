import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://oproabhrvxbyshrejqth.supabase.co/storage/v1/object/public/Cabin/cabin-001.jpg?t=2024-03-28T13%3A37%3A00.358Z"
        alt=""
      />
    </Row>
  );
}

export default Cabins;
