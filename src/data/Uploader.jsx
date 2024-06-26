import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { getCabins } from "../services/apiCabins";

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createBookings() {
  const cabins = await getCabins();

  const finalBookings = bookings.map((booking) => {
    const [cabin] = cabins.filter((el) => el.id === booking.cabin_id);

    const num_nights = subtractDates(booking.end_date, booking.start_date);
    const cabin_price = num_nights * (cabin.regular_price - cabin.discount);
    const extras_price = booking.has_breakfast
      ? num_nights * 15 * booking.num_guests
      : 0;
    const total_price = cabin_price + extras_price;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      num_nights,
      cabin_price,
      extras_price,
      total_price,
      guest_id: booking.guest_id,
      cabin_id: cabin.id,
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings if there is no data
      </Button>
    </div>
  );
}

export default Uploader;
