import ActivityList from './activityList'

import { profileCollectionsDataJson } from "../../../../mock/db"

export default {
    title: 'Table',
    component: ActivityList,
}

export const Activity = () => <ActivityList listData={profileCollectionsDataJson}></ActivityList>