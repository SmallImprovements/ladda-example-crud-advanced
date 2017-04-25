import { build } from 'ladda-cache';
import { logger } from 'ladda-logger';
import { observable } from 'ladda-observable';
import * as contacts from './contacts';
import * as activities from './activities';

const config = {
  contacts: {
    api: contacts,
    invalidates: ['activities']
  },
  activities: {
    api: activities
  }
};

export default build(config, [
  logger(),
  observable()
]);
