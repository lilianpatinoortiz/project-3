import { useEffect } from "react";
import { ProjectsContainer } from "../components/Project/index";
import { useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { QUERY_PROJECTS, QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_PROJECTS, UPDATE_TASKS } from "../utils/actions";
import { useTaskGuruContext } from "../utils/GlobalState";

function Projects() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  // state for the app
  const [state, dispatch] = useTaskGuruContext();
  // Projects data
  const { loading, data: projects } = useQuery(QUERY_PROJECTS);
  // Tasks data
  const { loading: loadingTasks, data: tasks } = useQuery(QUERY_TASKS);

  // Handle projects changes
  useEffect(() => {
    if (projects) {
      dispatch({
        type: UPDATE_PROJECTS,
        projects: projects.projects,
      });
    }
  }, [projects, dispatch]);

  // Handle tasks changes
  useEffect(() => {
    if (tasks) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: tasks.tasks,
      });
    }
  }, [tasks, dispatch]);

  // If the user is not logged in
  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <>
            <h5>
              You need to be logged in to see this. Use the access links to sign
              up or log in!
            </h5>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={1000} height={600} />
            </Stack>
          </>
        ) : null}
      </>
    );
  }
  // If the user is  logged in
  return (
    <>
      <ProjectsContainer
        loading={loading}
        projects={state.projects}
        tasks={state.tasks}
      ></ProjectsContainer>
    </>
  );
}

export default Projects;
