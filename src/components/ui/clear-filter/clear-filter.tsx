import { DeleteIcon } from "@/assets/icons/delete-icon"
import { Button } from "../button"
import { Typography } from "../typography"
import { useAppDispatch } from "@/services/store"
import { decksSlice } from "@/services/decks/decks.slice"

export const ClearFilterComponent = () => {

   const dispatch = useAppDispatch()

   const setSearchByName = (name: string) => dispatch(decksSlice.actions.setSearchByName(name))
   const setCurrentPage = (value: number) => dispatch(decksSlice.actions.setCurrentPage(value))
   const setAuthor = (id: string) => dispatch(decksSlice.actions.setAuthor(id))
   const setMinCardsCount = (value: number) => dispatch(decksSlice.actions.setMinCardsCount(value))
   const setMaxCardsCount = (value: number) => dispatch(decksSlice.actions.setMaxCardsCount(value))

   const onDeleteHandler = () => {
      setSearchByName('')
      setCurrentPage(1)
      setAuthor('')
      setMinCardsCount(0)
      setMaxCardsCount(52)
   }
   return (
      <Button variant={'secondary'} onClick={onDeleteHandler}>
         <div style={{ display: 'flex' }}>
            <DeleteIcon />
            <div style={{ marginLeft: '10px' }}>
               <Typography.Subtitle2>Clear Filter</Typography.Subtitle2>
            </div>
         </div>
      </Button>
   )
}