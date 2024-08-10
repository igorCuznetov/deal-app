import { RouterOutputs } from '@/utils/api';

export type Collections = RouterOutputs['collection']['all'] | undefined;
export type Locations = RouterOutputs['location']['all'] | undefined;
export type Categories = RouterOutputs['category']['all'] | undefined;
export type Task = RouterOutputs['task']['all'][0] | undefined;

export type Product = RouterOutputs['product']['all']['products'][0];
