import './general.css'

function ServiceRef(props: { name: string, since: number, bin_path: string}) {
  return (
    <div className="serviceRef">
      <div className="top">
        <span className='name'>{props.name}</span>
        <span className='since'>{props.since}</span>
      </div>
      <span className='living_at'>{props.bin_path}</span>
    </div>
  );
}

export default ServiceRef;
