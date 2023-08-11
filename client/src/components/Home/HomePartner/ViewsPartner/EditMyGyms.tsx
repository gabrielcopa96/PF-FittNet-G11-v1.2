import React from "react";
import UpdateGym from "../../../UpDatePartner/gym";

export function EditMyGyms(props: any) {
  const { idGym } = props;
  return (
    <div>
      Editar mis gimnasios
      <UpdateGym idGym={idGym}/>
    </div>
  );
}
