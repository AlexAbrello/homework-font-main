// import { FC } from 'react'

// import { Pagination } from '@/components/ui/pagination/pagination.tsx'
// import { SelectComponent } from '@/components/ui/select/select.tsx'

// type PaginationProps = {
//   count: number
//   currentPage: number
//   itemsPerPage: number
//   setCurrentPage: (currentPage: number) => void
//   setItemsPerPage: (itemsPerPage: number) => void
// }

// export const PaginationPanel: FC<PaginationProps> = ({
//   count,
//   currentPage,
//   itemsPerPage,
//   setCurrentPage,
//   setItemsPerPage,
// }) => {
//   return (
//     <>
//       <Pagination count={count} page={currentPage} onChange={setCurrentPage} />
//       <div>
//         <span>Show </span>
//         <SelectComponent placeholder={itemsPerPage} onChange={setItemsPerPage}>
//           <div>10</div>
//           <div>20</div>
//           <div>30</div>
//         </SelectComponent>
//         <span> elements on page</span>
//       </div>
//     </>
//   )
// }
