import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';

const UserDataTable = () => {
    const [userData,setUserData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setUserData(json)
        })
    }, [])

    const columns = [
        {
            title: 'Name',
            field: 'name'
        },{
            title: 'Username',
            field: 'username'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Phone',
            field: 'phone'
        },
        {
            title: 'Website',
            field: 'website'
        }
    ]
    return(
        <div>

            <MaterialTable
                title="User Data Table"
                data={userData}
                columns={columns}
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                    addRowPosition: 'first'
                }}
                editable={{
                    // add new user data
                    onRowAdd:(newRow) => new Promise((reslove,reject)=>
                    {
                    //console.log(newRow)
                    const updatedRows = [...userData, newRow]
                    setTimeout(() => {
                        setUserData(updatedRows)
                        reslove()
                    }, 2000)
                    }),
                    // edit and update the user data
                    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                        //console.log("old", oldData)
                        //console.log("new", newData)
                        setTimeout(() => {
                            const dataUpdate = [...userData];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setUserData([...dataUpdate]);
                            resolve();
                        }, 1000);
                    }),
                    // delete the user data
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...userData];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setUserData([...dataDelete]);

                            resolve();
                        }, 1000);
                    })

                }}
            />
        </div>
    )
}

export default UserDataTable;