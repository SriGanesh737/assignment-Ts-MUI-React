import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, ListItemButton } from '@mui/material';

interface Department {
    department: string;
    sub_departments: string[];
}

interface SubDepartment {
    name: string;
    selected: boolean;
}

const Component2: React.FC<{ departments: Department[] }> = ({ departments }) => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selectedSubDepartments, setSelectedSubDepartments] = useState<SubDepartment[]>([]);

    const handleExpand = (department: string) => {
        setExpanded((prevExpanded) =>
            prevExpanded.includes(department)
                ? prevExpanded.filter((d) => d !== department)
                : [...prevExpanded, department]
        );
    };

    const handleSubDepartmentToggle = (subDepartment: string) => {
        setSelectedSubDepartments((prevSelected) => {
            const updatedSelected = [...prevSelected];
            const index = updatedSelected.findIndex((d) => d.name === subDepartment);
            if (index !== -1) {
                updatedSelected[index] = {
                    ...updatedSelected[index],
                    selected: !updatedSelected[index].selected,
                };
            }
            return updatedSelected;
        });
    };

    const handleDepartmentToggle = (department: Department) => {
        const subDepartments = department.sub_departments.map((subDepartment) => ({
            name: subDepartment,
            selected: !isSelected(subDepartment),
        }));
        setSelectedSubDepartments((prevSelected) => [...prevSelected, ...subDepartments]);
    };

    const isSelected = (subDepartment: string) => {
        return selectedSubDepartments.some((d) => d.name === subDepartment && d.selected);
    };

    const isDepartmentSelected = (department: Department) => {
        const subDepartments = department.sub_departments;
        return subDepartments.every((subDepartment) => isSelected(subDepartment));
    };

    const isDepartmentIndeterminate = (department: Department) => {
        const subDepartments = department.sub_departments;
        return subDepartments.some((subDepartment) => isSelected(subDepartment)) && !isDepartmentSelected(department);
    };

    return (
        <List>
            {departments.map((department) => (
                <React.Fragment key={department.department}>
                    <ListItemButton

                        onClick={() => handleExpand(department.department)}
                        selected={isDepartmentSelected(department)}
                        dense
                    >
                        <Checkbox
                            checked={isDepartmentSelected(department)}
                            indeterminate={isDepartmentIndeterminate(department)}
                            onClick={() => handleDepartmentToggle(department)}
                            size="small"
                        />
                        <ListItemText primary={department.department} />
                    </ListItemButton>
                    <Collapse in={expanded.includes(department.department)}>
                        <List component="div" disablePadding>
                            {department.sub_departments.map((subDepartment) => (
                                <ListItem key={subDepartment} dense>
                                    <Checkbox
                                        checked={isSelected(subDepartment)}
                                        onClick={() => handleSubDepartmentToggle(subDepartment)}
                                        size="small"
                                    />
                                    <ListItemText primary={subDepartment} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
};

export default Component2;
