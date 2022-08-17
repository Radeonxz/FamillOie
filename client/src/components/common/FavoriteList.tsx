import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ListItem, Box, Typography, ListItemButton } from "@mui/material";

import boardApi from "../../apis/boardApi";
import { setFavoriteList } from "../../redux/features/favoriteSlice";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: any) => state.favorites.value);

  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getFavorites();
        dispatch(setFavoriteList(res));
      } catch (err) {}
    };

    getBoards();
  }, []);

  useEffect(() => {
    const activeIndex = list.length
      ? list.findIndex((e: any) => e.id === boardId)
      : -1;

    setActiveIndex(activeIndex);
  }, [list, boardId]);

  const onDragEnd = async ({ source, destination }: any) => {
    const newList = [...list];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setFavoriteList(newList));

    try {
      await boardApi.updateFavoritePosition({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Favorites
          </Typography>
        </Box>
      </ListItem>

      {list.length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key="list-board-droppable"
            droppableId="list-board-droppable"
          >
            {(provided: any) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any, snapshot: any) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer!important"
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};

export default FavoriteList;
