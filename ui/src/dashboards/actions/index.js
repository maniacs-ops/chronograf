import {
  getDashboards as getDashboardsAJAX,
  updateDashboard as updateDashboardAJAX,
  deleteDashboard as deleteDashboardAJAX,
  updateDashboardCell as updateDashboardCellAJAX,
  addDashboardCell as addDashboardCellAJAX,
  deleteDashboardCell as deleteDashboardCellAJAX,
} from 'src/dashboards/apis'

import {publishNotification} from 'shared/actions/notifications'
import {publishAutoDismissingNotification} from 'shared/dispatchers'

import {NEW_DEFAULT_DASHBOARD_CELL} from 'src/dashboards/constants'

export const loadDashboards = (dashboards, dashboardID) => ({
  type: 'LOAD_DASHBOARDS',
  payload: {
    dashboards,
    dashboardID,
  },
})

export const setTimeRange = timeRange => ({
  type: 'SET_DASHBOARD_TIME_RANGE',
  payload: {
    timeRange,
  },
})

export const updateDashboard = dashboard => ({
  type: 'UPDATE_DASHBOARD',
  payload: {
    dashboard,
  },
})

export const deleteDashboard = dashboard => ({
  type: 'DELETE_DASHBOARD',
  payload: {
    dashboard,
  },
})

export const deleteDashboardFailed = dashboard => ({
  type: 'DELETE_DASHBOARD_FAILED',
  payload: {
    dashboard,
  },
})

export const updateDashboardCells = (dashboard, cells) => ({
  type: 'UPDATE_DASHBOARD_CELLS',
  payload: {
    dashboard,
    cells,
  },
})

export const syncDashboardCell = (dashboard, cell) => ({
  type: 'SYNC_DASHBOARD_CELL',
  payload: {
    dashboard,
    cell,
  },
})

export const addDashboardCell = (dashboard, cell) => ({
  type: 'ADD_DASHBOARD_CELL',
  payload: {
    dashboard,
    cell,
  },
})

export const editDashboardCell = (dashboard, x, y, isEditing) => ({
  type: 'EDIT_DASHBOARD_CELL',
  // x and y coords are used as a alternative to cell ids, which are not
  // universally unique, and cannot be because React depends on a
  // quasi-predictable ID for keys. Since cells cannot overlap, coordinates act
  // as a suitable id
  payload: {
    dashboard,
    x, // x-coord of the cell to be edited
    y, // y-coord of the cell to be edited
    isEditing,
  },
})

export const renameDashboardCell = (dashboard, x, y, name) => ({
  type: 'RENAME_DASHBOARD_CELL',
  payload: {
    dashboard,
    x, // x-coord of the cell to be renamed
    y, // y-coord of the cell to be renamed
    name,
  },
})

export const deleteDashboardCell = cell => ({
  type: 'DELETE_DASHBOARD_CELL',
  payload: {
    cell,
  },
})

export const editCellQueryStatus = (queryID, status) => ({
  type: 'EDIT_CELL_QUERY_STATUS',
  payload: {
    queryID,
    status,
  },
})

export const editTemplate = (dashboardID, templateID, updates) => ({
  type: 'EDIT_TEMPLATE',
  payload: {
    dashboardID,
    templateID,
    updates,
  },
})

// Stub Template Variables Data

const templates = [
  {
    id: 1,
    type: 'tagKeys',
    label: 'test query',
    tempVar: '$HOSTS',
    query: {
      db: 'db1',
      measurement: 'm1',
      text: 'SHOW TAGS WHERE HUNTER = "coo"',
    },
    values: [
      {value: 'h1', type: 'tagKeys', selected: false},
      {value: 'h2', type: 'tagKeys', selected: false},
      {value: 'h3', type: 'tagKeys', selected: false},
      {value: 'h4', type: 'tagKeys', selected: false},
    ],
  },
  {
    id: 2,
    type: 'csv',
    label: 'test csv',
    tempVar: '$INFLX',
    values: [
      {value: 'A', type: 'csv', selected: false},
      {value: 'B', type: 'csv', selected: false},
      {value: 'C', type: 'csv', selected: false},
    ],
  },
]

// Async Action Creators

export const getDashboardsAsync = dashboardID => async dispatch => {
  try {
    const {data: {dashboards}} = await getDashboardsAJAX()
    const stubbedDashboards = dashboards.map(d => ({...d, templates}))
    dispatch(loadDashboards(stubbedDashboards, dashboardID))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const putDashboard = dashboard => dispatch => {
  updateDashboardAJAX(dashboard).then(({data}) => {
    dispatch(updateDashboard({...data, templates}))
  })
}

export const updateDashboardCell = (dashboard, cell) => dispatch => {
  return updateDashboardCellAJAX(cell).then(({data}) => {
    dispatch(syncDashboardCell(dashboard, data))
  })
}

export const deleteDashboardAsync = dashboard => async dispatch => {
  dispatch(deleteDashboard(dashboard))
  try {
    await deleteDashboardAJAX(dashboard)
    dispatch(
      publishAutoDismissingNotification(
        'success',
        'Dashboard deleted successfully.'
      )
    )
  } catch (error) {
    dispatch(deleteDashboardFailed(dashboard))
    dispatch(
      publishNotification(
        'error',
        `Failed to delete dashboard: ${error.data.message}.`
      )
    )
  }
}

export const addDashboardCellAsync = dashboard => async dispatch => {
  try {
    const {data} = await addDashboardCellAJAX(
      dashboard,
      NEW_DEFAULT_DASHBOARD_CELL
    )
    dispatch(addDashboardCell(dashboard, data))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteDashboardCellAsync = cell => async dispatch => {
  try {
    await deleteDashboardCellAJAX(cell)
    dispatch(deleteDashboardCell(cell))
  } catch (error) {
    console.error(error)
    throw error
  }
}
