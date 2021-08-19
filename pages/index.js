import Map from 'components/map/'

export default function Index (props) {

  return (
    <Map mapboxAccessToken={props.mapboxAccessToken} />
  );

}

export const getServerSideProps = async () => {
  return {
    props: {mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN}
  }
}