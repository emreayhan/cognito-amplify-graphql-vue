<template>
  <div class="list">
    <h3 class="mb-4">Shopping List</h3>
    <b-row class="justify-content-center">
      <b-col cols="3" inline>
        <b-input
          v-model="newItem"
          class="mr-3"
          placeholder="new item"
          @keyup.enter.prevent="addNewItem"
        >
        </b-input>
      </b-col>
      <b-col cols="1">
        <b-button variant="success" size="md" @click.prevent="addNewItem">
          Add
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4 justify-content-center">
      <b-col cols="4">
        <b-list-group>
          <b-list-group-item v-for="(item, index) in listItems" :key="index">
            <b-row class="flex-row">
              <b-col class="d-flex justify-content-center align-items-center">
                {{ item.itemName }}
                <b-button
                  class="ml-5"
                  variant="danger"
                  size="sm"
                  @click="deleteItem(item.id)"
                >
                  X
                </b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
export default {
  data: () => ({
    newItem: null,
    listItems: []
  }),

  async mounted() {
    const currentUser = await Auth.currentAuthenticatedUser();

    API.graphql(
      graphqlOperation(subscriptions.onCreateShoppingListItem, {
        owner: currentUser.username
      })
    ).subscribe({
      next: action =>
        this.listItems.push(action.value.data.onCreateShoppingListItem)
    });

    API.graphql(
      graphqlOperation(subscriptions.onDeleteShoppingListItem, {
        owner: currentUser.username
      })
    ).subscribe({
      next: action => {
        const id = action.value.data.onDeleteShoppingListItem.id;
        const index = this.listItems.map(item => item.id).indexOf(id);
        this.listItems.splice(index, 1);
      }
    });
  },
  async created() {
    const { data } = await API.graphql(
      graphqlOperation(queries.listShoppingListItems)
    );
    data.listShoppingListItems.items.forEach(item => {
      this.listItems.push(item);
    });
  },
  methods: {
    async addNewItem() {
      await API.graphql(
        graphqlOperation(mutations.createShoppingListItem, {
          input: { itemName: this.newItem }
        })
      );
      this.newItem = null;
    },
    deleteItem(id) {
      API.graphql(
        graphqlOperation(mutations.deleteShoppingListItem, {
          input: { id: id }
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
