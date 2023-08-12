import axios from "axios";

export async function SendEmail(put: any): Promise<any> {  
  const email = await axios({
    method: "post",
    url: "/api/service/emails/",
    data: put,
    headers: { "X-Requested-With": "XMLHttpRequest" },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));

  if (email.sended === true) { return true }
  if (email.sended === false) { return false }
}