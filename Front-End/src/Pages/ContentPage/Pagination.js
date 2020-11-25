

   export default function Pagination ({employeesPerPage, totalEmployees,Paginate}) {

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i ++) {
            pageNumbers.push(i);           
        }

        return (
            <div>
                <ul className='pagination'>
                    {pageNumbers.map(num => (
                        <li key={num} className='page-item'>
                            <a onClick={() => Paginate(num)} className='page-link'>
                                {num}
                            </a>
                        </li>
                    ) )}
                </ul>
            </div>
        )
    }