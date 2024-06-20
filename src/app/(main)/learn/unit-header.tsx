type UnitHeaderProps = {
    title: string;
    description: string;}

  export default function UnitHeader({title, description}: UnitHeaderProps) {
    return(<div className="flex flex-col text-white">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>);
  }