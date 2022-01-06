import React from "react";
import { useDispatch } from "react-redux";
import { deleteRitual } from "../../actions/ritual.actions";

const DeleteRitual = (props) => {
  const dispatch = useDispatch();

  const deleteRitual = () => dispatch(deleteRitual(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteRitual();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteRitual;
