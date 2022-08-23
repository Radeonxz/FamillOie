import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Divider,
  TextField,
  IconButton
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import sectionApi from "../../apis/sectionApi";
import taskApi from "../../apis/taskApi";
import TaskModal from "./TaskModal";

let timer: any;
const timeout = 500;

const Section = ({ boardId, data }: any) => {
  const [newData, setNewData] = useState<any>([]);
  const [selectedTask, setSelectedTask] = useState(undefined);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const createSection = async () => {
    try {
      const section = await sectionApi.create(boardId);
      setNewData([...newData, section]);
    } catch (err) {
      alert(err);
    }
  };

  const deleteSection = async (sectionId: string) => {
    try {
      await sectionApi.delete(boardId, sectionId);
      const newSections = [...newData].filter((e: any) => e.id !== sectionId);
      setNewData(newSections);
    } catch (err) {
      alert(err);
    }
  };

  const updateSectionTitle = async (e: any, sectionId: string) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newSections = [...newData];
    const index = newSections.findIndex((e) => e.id === sectionId);
    newSections[index].title = newTitle;
    setNewData(newSections);
    timer = setTimeout(async () => {
      try {
        await sectionApi.update(boardId, sectionId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const createTask = async (sectionId: string) => {
    try {
      const task = await taskApi.create(boardId, { sectionId });
      const newSections = [...newData];
      const index = newSections.findIndex((e: any) => e.id === sectionId);
      newSections[index].tasks.unshift(task);
      setNewData(newSections);
    } catch (err) {
      alert(err);
    }
  };

  const onDragEnd = async ({ source, destination }: any) => {
    if (!destination) return;
    const sourceColIndex = newData.findIndex(
      (e: any) => e.id === source.droppableId
    );
    const destinationColIndex = newData.findIndex(
      (e: any) => e.id === destination.droppableId
    );

    const sourceCol = newData[sourceColIndex];
    const destinationCol = newData[destinationColIndex];

    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destinationCol.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      newData[sourceColIndex].tasks = sourceTasks;
      newData[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      newData[destinationColIndex].tasks = destinationTasks;
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId
      });
      setNewData(newData);
    } catch (err) {
      alert(err);
    }
  };

  const onUpdateTask = (task: any) => {
    const newSections = [...newData];
    const sectionIndex = newSections.findIndex(
      (e: any) => e.id === task.section.id
    );
    const taskIndex = newSections[sectionIndex].tasks.findIndex(
      (e: any) => e.id === task.id
    );
    newSections[sectionIndex].tasks[taskIndex] = task;
    setNewData(newSections);
  };

  const onDeleteTask = (task: any) => {
    const newSections = [...newData];
    const sectionIndex = newSections.findIndex(
      (e: any) => e.id === task.section.id
    );
    const taskIndex = newSections[sectionIndex].tasks.findIndex(
      (e: any) => e.id === task.id
    );
    newSections[sectionIndex].tasks.splice(taskIndex, 1);
    setNewData(newSections);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignments: "center",
          justifyContent: "space-between"
        }}
      >
        <Button onClick={createSection}>Add a section</Button>
        <Typography variant="body2" fontWeight="700">
          {newData.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw-400px)",
            overflow: "auto"
          }}
        >
          {newData.map((section: any) => (
            <div key={section.id} style={{ width: "300px" }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided: any) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px"
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px"
                      }}
                    >
                      <TextField
                        value={section.title}
                        onChange={(e) => updateSectionTitle(e, section.id)}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset"
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "700"
                          }
                        }}
                      />

                      <IconButton
                        size="small"
                        sx={{ color: "grey", "&:hover": { color: "green" } }}
                        onClick={() => createTask(section.id)}
                      >
                        <AddOutlinedIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        sx={{ color: "grey", "&:hover": { color: "red" } }}
                        onClick={() => deleteSection(section.id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Box>
                    {section.tasks.map((task: any, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: "10px",
                              marginBottom: "10px",
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important"
                            }}
                            onClick={() => setSelectedTask(task)}
                          >
                            <Typography>
                              {task.title === "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      <TaskModal
        selectedTask={selectedTask}
        boardId={boardId}
        onClose={() => setSelectedTask(undefined)}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </>
  );
};

export default Section;
