import  React,{ useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox,IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Department{
    department: string;
    sub_departments: string[];
}



const Component2: React.FC<{ departments: Department[] }> = ({ departments }) => {

    const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
    const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);


    const handleExpand = (department: string) => {

        if (expandedDepartments.includes(department)) {
            setExpandedDepartments(prevExpanded => prevExpanded.filter(dep => dep !== department));
        }
        else setExpandedDepartments(prevExpanded => ([...prevExpanded, department]));
    };

    const handleSubDepartmentToggle = (subDepartment: string) => {

        if (selectedSubDepartments.includes(subDepartment))
            setSelectedSubDepartments(prevSelected => (prevSelected.filter((dep) => dep !== subDepartment)))
        else setSelectedSubDepartments(prevSelected => [...prevSelected, subDepartment]);


    };

    const isDepartmentSelected = (department: Department) => {
        const subDepartments = department.sub_departments;
        //if all subdepartments of a department are selected add it to selected departments list
        if (subDepartments.every((subDepartment) => selectedSubDepartments.includes(subDepartment))) {
            if (!selectedDepartments.includes(department)) setSelectedDepartments(prevSelected => [...prevSelected, department]);
        }
        else {
            //if any one also not selected and the department present in selected list remove it from the list.
            if (selectedDepartments.includes(department)) setSelectedDepartments(prevSelected => prevSelected.filter(dep => dep !== department));
        }


        return subDepartments.every((subDepartment) => selectedSubDepartments.includes(subDepartment));
    };

    const handleDepartmentToggle = (department: Department) => {
        const subDepartments = department.sub_departments;
        if (selectedDepartments.includes(department)) {

            //uncheck all the subdepartments
            subDepartments.map((sub) => {
                if (selectedSubDepartments.includes(sub)) setSelectedSubDepartments(prevSelected => (prevSelected.filter((dep) => dep !== sub)));
            });
            setSelectedDepartments(prevSelDep => (prevSelDep.filter(dep => dep !== department)));

        }
        else {
            //check all the subdepartments and add department to selected departments
            subDepartments.map((sub) => {
                if (!selectedSubDepartments.includes(sub)) {
                    setSelectedSubDepartments(prevSelected => [...prevSelected, sub])
                }
            });
            setSelectedDepartments(prevSelDep => [...prevSelDep, department]);
            if (!expandedDepartments.includes(department.department))
                setExpandedDepartments(prevExpDep => [...prevExpDep, department.department]);
        }


    };



  return (
      <List>
          {
              departments.map((department) => {

                  return <React.Fragment key={department.department}>
                      <div style={{ display: 'flex',alignItems:'center' }}>
                          <IconButton onClick={() => handleExpand(department.department)}>

                              {
                                  expandedDepartments.includes(department.department) ? <RemoveIcon /> : <AddIcon />}
                          </IconButton>
                          <Checkbox
                              checked={isDepartmentSelected(department)}
                              onClick={() => handleDepartmentToggle(department)}
                              size="small"
                          />
                          <ListItemText primary={department.department} />
                      </div>
                      <Collapse in={expandedDepartments.includes(department.department)}>
                          <List component="div" disablePadding>
                              {department.sub_departments.map((subDepartment) => (
                                  <ListItem key={subDepartment} dense>
                                      <Checkbox
                                          checked={selectedSubDepartments.includes(subDepartment)}
                                          onClick={() => handleSubDepartmentToggle(subDepartment)}
                                          size="small"
                                      />
                                      <ListItemText primary={subDepartment} />
                                  </ListItem>
                              ))}
                          </List>
                      </Collapse>

                  </React.Fragment>
              }
              )
          }
    </List>
  )
}

export default Component2;
