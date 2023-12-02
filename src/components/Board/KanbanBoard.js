import { useMemo, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTasks, saveTask, updateTaskName, removeTask, updateTaskStage } from "../../store/taskSlice";
import { getStages, saveStage, updateStageName, deletStage } from "../../store/stageSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "../layout/Notification";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function KanbanBoard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let projectId = queryParams.get('pid');
  let featureId = queryParams.get('fid');
  
  console.log(projectId)

  const tasks = useSelector(state => state.task.tasks);
  const columns = useSelector(state => state.stage.stages);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const notification = useSelector(state => state.ui.notification);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.id);

  console.log(token)
  useEffect(() => {
    dispatch(getTasks(projectId,featureId,token));
    dispatch(getStages(projectId,token));
  }, [dispatch]);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="
        m-auto
        flex-col
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[10px]
        bg-gray-50
        bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300
    "
    >
     
      <div className="py-10">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                  />
                ))}
              </SortableContext>
            </div>
            <button
              onClick={() => {
                createNewColumn();
              }}
              className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Stage
            </button>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>


    </div>
  );

  function createTask(columnId) {
    const newTask = {
      stageId: columnId,
      name: ``,
      projectId,
      featureId
    };
    dispatch(saveTask(newTask,token))
  }

  function deleteTask(id) {
    dispatch(removeTask(id,projectId,featureId,token));
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    dispatch(updateTaskName(id, content,projectId,featureId,token))
  }

  function createNewColumn() {
    const columnToAdd = {
      id: columns.length + 1,
      title: ``,
    };

    dispatch(saveStage({
      projectId,
      name: ''
    },token))
    // setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    dispatch(deletStage(id,projectId,token));
  }

  function updateColumn(id, title) {
    dispatch(updateStageName(id, title,projectId,token));
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    let taskId = activeId;
    let stageId = overId;
    dispatch(
      updateTaskStage(taskId, stageId,projectId,featureId,token)
    )
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      
      let taskId = activeId;
      let stageId = over.data.current.task.columnId;
      dispatch(
        updateTaskStage(taskId, stageId,projectId,featureId,token)
      )
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      let taskId = activeId;
      let stageId = overId;

      dispatch(
        updateTaskStage(taskId,stageId,projectId,featureId,token)
      )
    }
  }
}



export default KanbanBoard;
