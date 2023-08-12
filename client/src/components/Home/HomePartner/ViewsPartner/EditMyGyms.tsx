import UpdateGym from "../../../UpDatePartner/gym";

export function EditMyGyms(props: any): JSX.Element {
  const { idGym } = props;
  return (
    <div>
      Editar mis gimnasios
      <UpdateGym idGym={idGym}/>
    </div>
  );
}
