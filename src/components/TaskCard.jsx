function TaskCard(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.priority}</p>
    </div>
  );
}

export default TaskCard;