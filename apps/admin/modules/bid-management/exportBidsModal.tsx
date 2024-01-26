import moment from 'moment'
import React, { useState } from 'react'
import { Loader } from '../shared/components/Loader'
import { ModalBackground, ModalContainer, Errormsg, FilterHeader, ButtonComponent, Button1, Button2, Dropdown, DropdownDate, DHead, DateL, Select, SelectD, Option, Line } from '../admin//styled-components/FilterModalStyle'
import API from '@apps/admin/api/admin'
import { toast } from 'react-toastify';

const ExportBidsModal = ({ closeModal }) => {

  const [date, setDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState(null)

  const handleSubmit = () => {
      API.exportBids(date ? moment(date).format('M/D/YYYY') : null)
      .then((res)=>{
          console.log('res', res)
          if (res?.data) {
              const csv = res?.data
              var hiddenElement = document.createElement('a');  
              hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);  
              hiddenElement.download = date ? `bids-${moment(date).format('M/D/YYYY')}.csv` : 'bids.csv';  
              hiddenElement.click();  
              toast.success(res?.data?.message || 'Bids CSV downloaded successfully')
              setTimeout(() => closeModal(), 3000)
          } else {
            toast.error(res?.error?.error?.message || 'Something went wrong. Try again later')
          }
      })
      .catch(err => {
        setLoading(false)
        toast.error(err?.error?.error?.message || 'Something went wrong. Try again later')
        console.log('updateAuctionStatus err', err)
      })
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <div>
          <FilterHeader
            onClick={() => closeModal()}
          >
            <h3>Export Bids</h3>
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99962 4.82129L10.1246 0.696289L11.303 1.87462L7.17795 5.99962L11.303 10.1246L10.1246 11.303L5.99962 7.17795L1.87462 11.303L0.696289 10.1246L4.82129 5.99962L0.696289 1.87462L1.87462 0.696289L5.99962 4.82129Z"
                  fill="#172F53"
                />
              </svg>
            </span>
          </FilterHeader>
          <div>
            <DropdownDate>
              <DateL>Select Date <small> (optional)</small></DateL>
              <SelectD
                onChange={(e: any) => setDate(e?.target?.value)}
                type="date"
                value={date || ''}
                max={moment().format('DD-MM-YYYY')}
              ></SelectD>
            </DropdownDate>
          </div>
          <Line></Line>
          <ButtonComponent>
            <Button1 onClick={() => closeModal()}>
              Cancel
            </Button1>
            <Button2 disabled={loading} onClick={() => handleSubmit()}>
              {loading ? (
                <>
                  Loading... <Loader height="20" width="20" />
                </>
              ) : (
                'Export'
              )}
            </Button2>
          </ButtonComponent>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}

export default ExportBidsModal;
