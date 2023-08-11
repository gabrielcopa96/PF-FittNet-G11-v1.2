import axios from "axios";

// @ts-expect-error TS(7030): Not all code paths return a value.
export async function SendEmail(put: any) {  
  const email = await axios({
    method: "post",
    url: "/api/service/emails/",
    data: put,
    headers: { "X-Requested-With": "XMLHttpRequest" },
    // withCredentials: true,
  })
    .then((res) => {
      return res.data;
    })
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    .catch((error) => console.log(error));

  if (email.sended === true) { return true }
  if (email.sended === false) { return false }
}