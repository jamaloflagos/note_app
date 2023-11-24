const Pagination = ({totalNotes, notesPerPage, paginate}) => {
    const pageNumbers = [];
    const nPage = Math.ceil(totalNotes / notesPerPage);
    for(let i = 1; i <= nPage; i++) {
        pageNumbers.push(i)
    }

  return (
    <nav>
        <ul>
            {
                pageNumbers.map( number => {
                    return <li><button onClick={() => paginate(number)}>{number}</button></li>
                })
            }
        </ul>
    </nav>
  )
}
export default Pagination