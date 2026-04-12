<template>
  <layout-header />
  <layout-sidebar />

  <div class="page-wrapper">
    <div class="content">
      <!-- HEADER -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Ticket Automation</h4>

        <div class="d-flex gap-2">
          <select class="form-select" v-model="filters.status" @change="fetchRules">
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button class="btn btn-primary" @click="openModal">
            + Add Rule
          </button>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-body p-0">
          <div v-if="loading" class="p-4 text-center">Loading...</div>

          <table v-else class="table mb-0">
            <thead>
              <tr>
                <th>Rule</th>
                <th>Trigger</th>
                <th>Condition</th>
                <th>Action</th>
                <th>Assign</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="rule in rules" :key="rule.id">
                <td>{{ rule.name }}</td>
                <td>{{ rule.triggerEvent }}</td>
                <td>
                  {{ rule.conditionField }}
                  {{ rule.operator }}
                  {{ rule.value }}
                </td>
                <td>{{ rule.actionType }}</td>
                <td>{{ rule.assignTo || '-' }}</td>
                <td>
                  <span
                    class="badge"
                    :class="rule.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'"
                  >
                    {{ rule.status }}
                  </span>
                </td>
              </tr>

              <tr v-if="!rules.length">
                <td colspan="6" class="text-center p-4">
                  No rules found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer text-center p-3">
      {{ new Date().getFullYear() }} © SmartHR
    </div>
  </div>

  <!-- MODAL -->
  <div class="modal fade" id="ruleModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5>Add Automation Rule</h5>
          <button class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">

          <div class="mb-3">
            <label>Rule Name</label>
            <input v-model="form.name" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Trigger</label>
            <select v-model="form.triggerEvent" class="form-select">
              <option value="TICKET_CREATED">Ticket Created</option>
              <option value="SLA_BREACHED">SLA Breached</option>
              <option value="PRIORITY_UPDATED">Priority Updated</option>
            </select>
          </div>

          <div class="mb-3">
            <label>Condition Field</label>
            <select v-model="form.conditionField" class="form-select">
              <option value="category">Category</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div class="mb-3">
            <label>Operator</label>
            <select v-model="form.operator" class="form-select">
              <option value="=">=</option>
              <option value=">">></option>
              <option value="<"><</option>
            </select>
          </div>

          <div class="mb-3">
            <label>Value</label>
            <input v-model="form.value" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Action</label>
            <select v-model="form.actionType" class="form-select">
              <option value="ASSIGN_TICKET">Assign Ticket</option>
              <option value="ESCALATE_TICKET">Escalate</option>
              <option value="CLOSE_TICKET">Close</option>
              <option value="SEND_EMAIL">Send Email</option>
            </select>
          </div>

          <div class="mb-3" v-if="form.actionType === 'ASSIGN_TICKET'">
            <label>Assign To</label>
            <input v-model="form.assignTo" class="form-control" />
          </div>

        </div>

        <div class="modal-footer">
          <button class="btn btn-light" @click="closeModal">Cancel</button>
          <button class="btn btn-primary" @click="createRule" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Rule' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      loading: false,
      saving: false,

      rules: [],

      filters: {
        status: "",
      },

      form: {
        name: "",
        triggerEvent: "TICKET_CREATED",
        conditionField: "",
        operator: "=",
        value: "",
        actionType: "ASSIGN_TICKET",
        assignTo: "",
        status: "ACTIVE",
      },
    };
  },

  mounted() {
    this.fetchRules();
  },

  methods: {
    async fetchRules() {
      this.loading = true;

      try {
        const { data } = await api.get("/tickets/automation", {
          params: {
            status: this.filters.status || undefined,
          },
        });

        this.rules = data.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    async createRule() {
      this.saving = true;

      try {
        await api.post("/tickets/automation", this.form);

        this.fetchRules();
        this.closeModal();
        this.resetForm();
      } catch (e) {
        console.error(e);
      } finally {
        this.saving = false;
      }
    },

    openModal() {
      const modal = new bootstrap.Modal(document.getElementById("ruleModal"));
      modal.show();
    },

    closeModal() {
      const el = document.getElementById("ruleModal");
      const modal = bootstrap.Modal.getInstance(el);
      modal.hide();
    },

    resetForm() {
      this.form = {
        name: "",
        triggerEvent: "TICKET_CREATED",
        conditionField: "",
        operator: "=",
        value: "",
        actionType: "ASSIGN_TICKET",
        assignTo: "",
        status: "ACTIVE",
      };
    },
  },
};
</script>
