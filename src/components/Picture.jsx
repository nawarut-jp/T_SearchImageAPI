const Picture = (props) => {
  return (
    <>
      <img src={props.cover_photo.urls.small} alt={props.description} />
    </>
  );
};

export default Picture;
