(function () {
    class PageComponent extends React.Component {
        render() {
            return (
                <EmployeesTable/>
            );
        }
    }

    class EmployeesTableRow extends React.Component {
        render() {
            let userMessage;
            if (this.props.employee.active) {
                userMessage = (
                    <td id="idCell" bgcolor="green"><font color="white">{String(this.props.employee.active)}</font>
                    </td>)

            } else {
                userMessage = (
                    <td id="idCell" bgcolor="red"><font color="white">{String(this.props.employee.active)}</font></td>)

            }
            return (

                <tr>
                    <td>{this.props.employee.id}</td>
                    <td>{this.props.employee.first_name}</td>
                    <td>{this.props.employee.last_name}</td>
                    <td>{this.props.employee.title}</td>
                    <td>{this.props.employee.email}</td>
                    <td>{this.props.employee.gender}</td>
                    {userMessage}
                </tr>

            );
        }
    }

    class EmployeesTable extends React.Component {

        constructor(props) {
            super(props);
            this.state = {employees: []};
            this.loadData = this.loadData.bind(this);
        }

        render() {
            const rows = this.state.employees.map((employee, i) => {
                return <EmployeesTableRow employee={employee}/>
            });
            return (
                <div>
                    <h1 align="center">ITMD - 565 - Project 2</h1>
                    <h2 align="center">Clitus Dmonte - cdmonte@hawk.iit.edu</h2>
                    <LoadBtn clickHandler={this.loadData}/>
                    <table id="resultTable" align="center">
                        <tbody id="tableBody">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Active</th>
                        </tr>

                        {rows}
                        </tbody>
                    </table>

                </div>

            );


        }


        componentDidMount() {
            this.loadData();
        }

        loadData() {
            var dataArray;
            var request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    dataArray = JSON.parse(request.responseText);
                    this.setState({employees: dataArray});
                    console.log(dataArray);
                }
            };
            request.open('GET', 'http://libertyville.rice.iit.edu/scripts/4565_lab3.php', true);
            request.send();
        }
    }


    class LoadBtn extends React.Component {
        render() {
            return (
                <button id="refreshBtn" onClick={this.props.clickHandler}>Load Data</button>
            );
        }
    }

    ReactDOM.render(<PageComponent/>, document.getElementById('root'));
})()
