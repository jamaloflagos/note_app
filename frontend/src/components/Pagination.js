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
                    return <li><a href="!#" onClick={() => paginate(number)}>{number}</a></li>
                })
            }
        </ul>
    </nav>
  )
}
export default Pagination