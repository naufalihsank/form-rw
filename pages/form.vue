<template>
  <ValidationObserver ref="observer">
    <form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <ValidationProvider v-slot="{ errors }" name="name" rules="required">
            <v-text-field
              v-model="form.name"
              :error-messages="errors"
              label="Nama"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="familyCard"
            rules="required|numeric"
          >
            <v-text-field
              v-model="form.familyCard"
              :error-messages="errors"
              label="Nomor Kartu Keluarga"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="age" rules="required">
            <label>Jenis Kelamin</label>
            <v-radio-group v-model="form.gender" :error-messages="errors">
              <v-row>
                <v-col
                  v-for="(gender, i) in genderList"
                  :key="i"
                  cols="12"
                  sm="6"
                >
                  <v-radio
                    :label="gender.label"
                    :value="gender.value"
                    :error-messages="errors"
                  ></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="rt" rules="required">
            <v-text-field
              v-model="form.rt"
              :error-messages="errors"
              label="RT"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="incomeBefore"
            rules="required|numeric"
          >
            <v-text-field
              v-model="form.incomeBefore"
              :error-messages="errors"
              label="Penghasilan sebelum pandemi"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="incomeAfter"
            rules="required|numeric"
          >
            <v-text-field
              v-model="form.incomeAfter"
              :error-messages="errors"
              label="Penghasilan setelah pandemi"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <ValidationProvider
            v-slot="{ errors }"
            name="nik"
            rules="required|numeric"
          >
            <v-text-field
              v-model="form.nik"
              :error-messages="errors"
              label="NIK"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="age"
            rules="required|numeric|above-25"
          >
            <v-text-field
              v-model="form.age"
              :error-messages="errors"
              label="Umur"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="address"
            rules="required|max:255"
          >
            <v-text-field
              v-model="form.address"
              :counter="255"
              :error-messages="errors"
              label="Alamat"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="rw" rules="required">
            <v-text-field
              v-model="form.rw"
              :error-messages="errors"
              label="RW"
              required
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <label>Alasan membutuhkan bantuan</label>
          <v-checkbox
            v-model="form.isLostJob"
            label="Kehilangan pekerjaan"
            :rules="rules"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.isCovidVictim"
            label="Kepala keluarga terdampak atau korban covid"
            :rules="rules"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.isPoor"
            label="Tergolong fakir/miskin semenjak sebelum covid"
            :rules="rules"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <ValidationProvider
          v-slot="{ errors }"
          name="agreement"
          rules="required"
        >
          <v-checkbox
            v-model="form.agreement"
            label="Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
            :error-messages="errors"
            class="pa-3"
          ></v-checkbox>
        </ValidationProvider>
      </v-row>
      <v-btn @click="handleSave" :loading="isLoading"> simpan </v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        name: null,
        nik: null,
        familyCard: null,
        age: null,
        gender: null,
        address: null,
        rt: null,
        rw: null,
        incomeBefore: null,
        incomeAfter: null,
        isLostJob: null,
        isCovidVictim: null,
        isPoor: null,
        other: null,
        agreement: null,
        notes: [],
      },
      genderList: [
        {
          label: "Laki-laki",
          value: "L",
        },
        {
          label: "Perempuan",
          value: "P",
        },
      ],
      notesList: [
        {
          label: "Kehilangan pekerjaan",
          value: "Kehilangan pekerjaan",
        },
        {
          label: "Kepala keluarga terdampak atau korban covid",
          value: "Kepala keluarga terdampak atau korban covid",
        },
        {
          label: "Tergolong fakir/miskin semenjak sebelum covid",
          value: "Tergolong fakir/miskin semenjak sebelum covid",
        },
      ],
      otherNotes: null,
      isLoading: false
    };
  },
  computed: {
    rules() {
      return [
        this.form.notes.length > 0 || "At least one item should be selected",
      ];
    },
  },
  methods: {
    async handleSave() {
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        return;
      }
      setTimeout(function () {
        this.isLoading = true;
      }, 5000);
    },
  },
};
</script>

<style>
</style>