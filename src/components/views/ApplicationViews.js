import { CustomerViews } from "./CustomerView"
import { EmployeeViews } from "./EmployeeView"

export const ApplicationViews = () => {
	const localBeetleUser = localStorage.getItem("beetlejuice_user")
	const beetleUserObject = JSON.parse(localBeetleUser)

	if (beetleUserObject.staff) {
		return <EmployeeViews />

	}

	else {

		return <CustomerViews />
	}
}