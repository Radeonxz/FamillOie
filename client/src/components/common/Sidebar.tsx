import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
  ListItemButton
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import assets from "../../assets";
import boardApi from "../../apis/boardApi";
import { setBoards } from "../../redux/features/boardSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const user = useSelector((state: any) => state.user.value);
  const boards = useSelector((state: any) => state.board.value);

  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarWidth = 250;

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res: any = await boardApi.getAll();
        dispatch(setBoards(res));
      } catch (err) {
        alert(err);
      }
    };
    getBoards();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = boards.length
      ? boards.findIndex((e: any) => e.id === boardId)
      : -1;
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [boards, boardId, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDragEnd = () => {};

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100vh",
        "& > div": { borderRight: "none" }
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: assets.colors.secondary
        }}
      >
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
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />

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
        <Box sx={{ paddingTop: "10px" }} />

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
              Privates
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>

        {boards.length && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              key="list-board-droppable"
              droppableId="list-board-droppable"
            >
              {(provided: any) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boards.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
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
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
