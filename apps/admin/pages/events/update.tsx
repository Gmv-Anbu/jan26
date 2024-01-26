import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import EventsForm from '@apps/admin/modules/admin/events/eventsForm';
import AdminLayout from '../../modules/admin/components/layout/layout';

import API from '../../api/admin/index';

const UpdateArtworkPage: NextPage = () => {
  const router = useRouter();
  const [eventId, setEventId] = useState<any>(null);
  const [eventData, setEventData] = useState<any>([]);
  const meta = {
    title: 'NFT2.0 | Admin Edit Artwork',
    description: 'Admin Edit Artwork',
  };

  const goToEventList = () => {
    router.push('/events');
  };

  const getEventsDataById = () => {
    API.getEventById(eventId)
      .then((res) => {
        if (res?.data?.data) {
          const data = res?.data?.data;
          if (data) {
            setEventData(data);
          }
        } else {
          goToEventList();
        }
      })
      .catch((err) => {
        goToEventList();
      });
  };

  useEffect(() => {
    if (router?.query?.id && Number(router?.query?.id)) {
      const id = Number(router?.query?.id);
      setEventId(id);
    } else {
      goToEventList();
    }
  }, [router]);

  useEffect(() => {
    if (eventId) {
      getEventsDataById();
    }
  }, [eventId]);

  return (
    <AdminLayout meta={meta} pageTitle={`Edit Event`}>
      <EventsForm
        admin={true}
        isEdit={true}
        eventData={eventData}
        onBackClick={goToEventList}
      />
    </AdminLayout>
  );
};

export default UpdateArtworkPage;
