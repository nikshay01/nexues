// js/schemas.js
const SCHEMAS = {
  body_metric: {
    label: "Body Metric",
    fields: {
      recorded_at: { type: "datetime", required: true },
      measurements: {
        type: "group",
        label: "Measurements",
        fields: {
          arms: {
            type: "group", label: "Arms",
            fields: {
              left_bicep_cm: { type: "number" },
              right_bicep_cm: { type: "number" },
              left_forearm_cm: { type: "number" },
              right_forearm_cm: { type: "number" },
              left_upper_arm_cm: { type: "number" },
              right_upper_arm_cm: { type: "number" }
            }
          },
          torso: {
            type: "group", label: "Torso",
            fields: {
              chest_relaxed_cm: { type: "number" },
              chest_flexed_cm: { type: "number" },
              waist_cm: { type: "number" },
              abdominal_cm: { type: "number" },
              hips_cm: { type: "number" }
            }
          },
          shoulders: {
            type: "group", label: "Shoulders",
            fields: {
              left_cm: { type: "number" },
              right_cm: { type: "number" },
              width_cm: { type: "number" }
            }
          },
          legs: {
            type: "group", label: "Legs",
            fields: {
              left_thigh_cm: { type: "number" },
              right_thigh_cm: { type: "number" },
              left_calf_cm: { type: "number" },
              right_calf_cm: { type: "number" }
            }
          },
          body: {
            type: "group", label: "Body",
            fields: {
              height_cm: { type: "number" },
              weight_kg: { type: "number" },
              neck_cm: { type: "number" },
              wrist_cm: { type: "number" },
              body_fat_percent: { type: "number" }
            }
          }
        }
      },
      notes: { type: "textarea" }
    }
  },

  devotion: {
    label: "Devotion Session",
    fields: {
      timestamp_start: { type: "datetime", required: true },
      duration_minutes: { type: "number", required: true },
      time_category: { type: "select", options: ["brahma-muhurta","morning","noon","evening","night"] },
      devotion_type: { type: "select", options: ["mandir","puja","aarti","jaap","path","kirtan","seva","satsang","vrat","other"] },
      deity_focus: { type: "select", options: ["Shiva","Vishnu","Devi","Ganesha","Ram","Krishna","other"] },
      location: { type: "select", options: ["home-mandir","temple","ashram","river","open-nature","other"] },
      temple_name: { type: "text" },
      guided: { type: "boolean" },
      guide_type: { type: "select", options: ["pandit","guru","organization","self"] },
      guide_name: { type: "text" },
      organization_name: { type: "text" },
      posture: { type: "select", options: ["standing","seated","kneeling","prostrating"] },
      pre_mood: { type: "select", options: ["anxious","sad","neutral","calm","devotional","joyful"] },
      post_mood: { type: "select", options: ["anxious","sad","neutral","calm","devotional","joyful"] },
      pre_stress_level: { type: "scale", min: 1, max: 10 },
      post_stress_level: { type: "scale", min: 1, max: 10 },
      stress_delta: { type: "computed", formula: "pre_stress_level - post_stress_level", label: "Stress Delta (auto)" },
      emotional_intensity: { type: "scale", min: 1, max: 10 },
      sense_of_peace: { type: "scale", min: 1, max: 10 },
      focus_during: { type: "scale", min: 1, max: 10 },
      gratitude_level: { type: "scale", min: 1, max: 10 },
      bhakti_felt: { type: "scale", min: 1, max: 10 },
      surrender_felt: { type: "scale", min: 1, max: 10 },
      divine_connection_felt: { type: "scale", min: 1, max: 10 },
      context_note: { type: "textarea" },
      pre_activity: { type: "select", options: ["sleep","exercise","work","eating","commute","other"] },
      context_location: { type: "select", options: ["home","work","travel","pilgrimage","other"] },
      social_context: { type: "select", options: ["alone","with family","with community","with guru"] },
      session_rating: { type: "scale", min: 1, max: 5 }
    }
  },

  health_log: {
    label: "Health Log",
    fields: {
      date: { type: "date", required: true },
      morning_energy: { type: "scale", min: 1, max: 10 },
      midday_energy: { type: "scale", min: 1, max: 10 },
      evening_energy: { type: "scale", min: 1, max: 10 },
      morning_body_stiffness: { type: "scale", min: 1, max: 10 },
      soreness_scale: { type: "scale", min: 1, max: 10 },
      headache_intensity: { type: "scale", min: 0, max: 10 },
      digestion_quality: { type: "scale", min: 1, max: 10 },
      hydration_level: { type: "scale", min: 1, max: 10 },
      sleep_quality: { type: "scale", min: 1, max: 10 },
      sleep_start: { type: "time" },
      sleep_end: { type: "time" },
      total_sleep_hours: { type: "number" },
      target_sleep_time: { type: "time", label: "Target Sleep Time (Goal)" },
      target_wake_time: { type: "time", label: "Target Wake Time (Goal)" },
      target_total_sleep_hours: { type: "number", label: "Target Total Sleep Hours (Goal)" },
      sleep_time_delta_minutes: { type: "number", label: "Sleep Time Delta (mins, + = late)" },
      wake_time_delta_minutes: { type: "number", label: "Wake Time Delta (mins, + = late)" },
      sleep_hours_delta: { type: "number", label: "Sleep Hours Delta (+ = over, - = under)" },
      sleep_interruptions: { type: "number" },
      wake_up_time_during_interruption: { type: "time" },
      sleep_debt_hours: { type: "number" },
      dream_count: { type: "number" },
      dream_context: { type: "textarea" },
      sick_status: { type: "boolean" },
      sickness_intensity: { type: "scale", min: 0, max: 10 },
      symptoms: { type: "tags", placeholder: "e.g. fever, headache, nausea" },
      breathing_quality: { type: "scale", min: 1, max: 10 },
      cough_intensity: { type: "scale", min: 0, max: 10 },
      mental_fatigue: { type: "scale", min: 1, max: 10 },
      physical_fatigue: { type: "scale", min: 1, max: 10 },
      stomach_discomfort: { type: "scale", min: 0, max: 10 },
      resting_heart_rate: { type: "number" },
      context_note: { type: "textarea" }
    }
  },

  hobbies: {
    label: "Hobby (New Entry)",
    fields: {
      name: { type: "text", required: true },
      category: { type: "text" },
      subcategory: { type: "text" },
      description: { type: "textarea" },
      intensity_type: { type: "select", options: ["low","moderate","high","extreme"] },
      dopamine_type: { type: "select", options: ["instant","delayed","flow-state","social"] },
      skill_growth_possible: { type: "boolean" },
      consistency_goal: { type: "select", options: ["daily","weekly","monthly","occasional"] },
      current_level: { type: "text" },
      self_rated_skill: { type: "scale", min: 1, max: 10 },
      target_level: { type: "text" },
      milestones: {
        type: "array",
        label: "Milestones",
        itemFields: {
          title: { type: "text" },
          achieved_at: { type: "date" },
          note: { type: "textarea" }
        }
      },
      goals: {
        type: "array",
        label: "Goals",
        itemFields: {
          title: { type: "text" },
          type: { type: "select", options: ["time","count","skill","streak","custom"] },
          target_value: { type: "number" },
          target_unit: { type: "text" },
          target_period: { type: "select", options: ["daily","weekly","monthly","yearly","lifetime"] },
          is_active: { type: "boolean" }
        }
      }
    }
  },

  hobby_session: {
    label: "Hobby Session",
    fields: {
      hobby_id: { type: "text", label: "Hobby ID / Name", required: true },
      started_at: { type: "datetime", required: true },
      ended_at: { type: "datetime" },
      duration_minutes: { type: "number" },
      location: { type: "text" },
      main_focus: { type: "text", label: "Main Focus of Session" },
      immersion_level: { type: "scale", min: 1, max: 10 },
      notes: { type: "textarea" },
      attachment_text: { type: "textarea", label: "Attachment / Notes (text)" },
      overall_session_quality: { type: "scale", min: 1, max: 10 },
      focus: { type: "scale", min: 1, max: 10 },
      energy: { type: "scale", min: 1, max: 10 },
      enjoyment: { type: "scale", min: 1, max: 10 },
      progress: { type: "scale", min: 1, max: 10 },
      difficulty: { type: "scale", min: 1, max: 10 },
      mood_snapshot: {
        type: "group", label: "Mood Snapshot (Optional)",
        fields: {
          mood: { type: "scale", min: 1, max: 10 },
          energy: { type: "scale", min: 1, max: 10 },
          stress: { type: "scale", min: 1, max: 10 }
        }
      }
    }
  },

  meditation: {
    label: "Meditation Session",
    fields: {
      timestamp_start: { type: "datetime", required: true },
      duration_minutes: { type: "number", required: true },
      type: { type: "select", options: ["breath","mantra","guided","silent","walking","body_scan","mindfulness","spiritual","focused","movement","transcendental","progressive_relaxation","loving_kindness","visualization"] },
      technique: { type: "select", options: ["box_breathing","raam_nam","mindfulness","visualization","other"] },
      posture: { type: "select", options: ["sitting","lying","walking","kneeling"] },
      environment: { type: "select", options: ["quiet","music","nature","noisy"] },
      back_support_used: { type: "boolean" },
      music_used: { type: "text" },
      pre_stress_level: { type: "scale", min: 1, max: 10 },
      pre_energy_level: { type: "scale", min: 1, max: 10 },
      pre_mood: { type: "scale", min: 1, max: 10 },
      pre_mental_clarity: { type: "scale", min: 1, max: 10 },
      pre_brain_fog: { type: "scale", min: 0, max: 10 },
      pre_tiredness: { type: "scale", min: 1, max: 10 },
      depth_level: { type: "scale", min: 1, max: 10 },
      distraction_level: { type: "scale", min: 1, max: 10 },
      focus_percentage: { type: "number" },
      distraction_spikes_count: { type: "number" },
      sleepiness_peak: { type: "scale", min: 0, max: 10 },
      mantra_count: { type: "number" },
      body_relaxation_level: { type: "scale", min: 1, max: 10 },
      heart_rate_before: { type: "number" },
      heart_rate_after: { type: "number" },
      post_stress_level: { type: "scale", min: 1, max: 10 },
      mental_clarity_after: { type: "scale", min: 1, max: 10 },
      calmness_after: { type: "scale", min: 1, max: 10 },
      energy_after: { type: "scale", min: 1, max: 10 },
      brain_fog_after: { type: "scale", min: 0, max: 10 },
      motivation_after: { type: "scale", min: 1, max: 10 },
      sense_of_presence: { type: "scale", min: 1, max: 10 },
      devotional_feeling: { type: "scale", min: 1, max: 10 },
      gratitude_level: { type: "scale", min: 1, max: 10 },
      effective_focus_minutes: { type: "number" },
      context_note: { type: "textarea" },
      location: { type: "text" },
      background_audio: { type: "text" },
      session_intention: { type: "textarea" }
    }
  },

  mood_entry: {
    label: "Mood Entry",
    fields: {
      timestamp: { type: "datetime", required: true },
      mood: { type: "scale", min: 0, max: 10 },
      energy: { type: "scale", min: 0, max: 10 },
      mental_clarity: { type: "scale", min: 0, max: 10 },
      calmness: { type: "scale", min: 0, max: 10 },
      anxiety: { type: "scale", min: 0, max: 10 },
      tiredness: { type: "scale", min: 0, max: 10 },
      sleepiness: { type: "scale", min: 0, max: 10 },
      confidence: { type: "scale", min: 0, max: 10 },
      motivation: { type: "scale", min: 0, max: 10 },
      frustration: { type: "scale", min: 0, max: 10 },
      stress: { type: "scale", min: 0, max: 10 },
      overthinking: { type: "scale", min: 0, max: 10 },
      brain_fog: { type: "scale", min: 0, max: 10 },
      sickness: { type: "scale", min: 0, max: 10 },
      laziness: { type: "scale", min: 0, max: 10 },
      boredom: { type: "scale", min: 0, max: 10 },
      mindfulness: { type: "scale", min: 0, max: 10 },
      emotions: {
        type: "array", label: "Emotions (multiple)",
        itemFields: {
          emotion: { type: "text" },
          intensity: { type: "scale", min: 0, max: 10 }
        }
      },
      context_activity: { type: "text" },
      context_location: { type: "text" },
      context_social: { type: "select", options: ["alone","with friends","with family","with partner","in public","online"] },
      context_note: { type: "textarea" }
    }
  },

  nutrition: {
    label: "Nutrition Log",
    fields: {
      date: { type: "date", required: true },
      meals: {
        type: "array", label: "Meals",
        itemFields: {
          name: { type: "select", options: ["breakfast","lunch","snack","dinner","pre-workout","post-workout","other"] },
          timestamp: { type: "datetime" },
          items: {
            type: "array", label: "Food Items",
            itemFields: {
              food_name: { type: "text" },
              quantity: { type: "number" },
              unit: { type: "select", options: ["g","ml","piece","bowl","tsp","tbsp","cup"] },
              calories_kcal: { type: "number" },
              protein_g: { type: "number" },
              carbs_g: { type: "number" },
              fat_g: { type: "number" },
              fiber_g: { type: "number" }
            }
          }
        }
      },
      daily_calories_kcal: { type: "number", label: "Daily Total Calories (kcal)" },
      daily_protein_g: { type: "number", label: "Daily Total Protein (g)" },
      daily_carbs_g: { type: "number", label: "Daily Total Carbs (g)" },
      daily_fat_g: { type: "number", label: "Daily Total Fat (g)" },
      daily_fiber_g: { type: "number", label: "Daily Total Fiber (g)" }
    }
  },

  pain_log: {
    label: "Pain Log",
    fields: {
      timestamp: { type: "datetime", required: true },
      body_parts: { type: "tags", label: "Body Parts / Muscles", placeholder: "e.g. left knee, lower back" },
      pain_type: { type: "select", options: ["sharp","dull","throbbing","burning","aching","stabbing","cramping","pressure","other"] },
      intensity: { type: "scale", min: 1, max: 10 },
      pain_start: { type: "datetime", label: "Pain Started At" },
      pain_end: { type: "datetime", label: "Pain Ended At" },
      duration_minutes: { type: "number" },
      possible_trigger: { type: "text" },
      context_note: { type: "textarea" },
      post_pain_avg_intensity: { type: "number", label: "Post-Log Avg Intensity" },
      post_pain_total_duration_minutes: { type: "number", label: "Post-Log Total Duration (mins)" }
    }
  },

  screentime: {
    label: "Screen Time",
    fields: {
      date: { type: "date", required: true },
      total_screen_time_minutes: { type: "number" },
      unlock_count: { type: "number" },
      social_media_minutes: { type: "number" },
      entertainment_minutes: { type: "number" },
      productive_minutes: { type: "number" },
      learning_minutes: { type: "number" },
      gaming_minutes: { type: "number" },
      short_form_used: { type: "boolean" },
      late_night_usage: { type: "boolean" },
      in_bed_usage: { type: "boolean" },
      intentional_percent: { type: "number" },
      autopilot_percent: { type: "number" }
    }
  },

  sexual_session: {
    label: "Sexual Session",
    fields: {
      timestamp_start: { type: "datetime", required: true },
      time_of_day: { type: "select", options: ["early-morning","morning","afternoon","evening","night","late-night"] },
      session_type: { type: "select", options: ["masturbation","partnered sex","mutual masturbation","oral","other"] },
      session_goal: { type: "text" },
      duration_minutes: { type: "number" },
      gap_since_last_session_hours: { type: "number" },
      trigger_type: { type: "select", options: ["habit","boredom","sexual desire","partner interaction","stress relief","other"] },
      medium_type: { type: "select", options: ["none","visual static","visual dynamic","interactive","digital interactive"] },
      porn_used: { type: "boolean" },
      arousal_intensity: { type: "scale", min: 1, max: 10 },
      conscious_control: { type: "scale", min: 1, max: 10 },
      erection_state: { type: "select", options: ["full","partial","weak","none","N/A"] },
      edging_occurred: { type: "boolean" },
      edging_duration_minutes: { type: "number" },
      release_occurred: { type: "boolean" },
      toy_used: { type: "boolean" },
      lubricant_used: { type: "boolean" },
      pain: { type: "boolean" },
      pain_points: { type: "text" },
      urge_resistance_attempts: { type: "number" },
      pre_mood: { type: "scale", min: 1, max: 10 },
      pre_energy: { type: "scale", min: 1, max: 10 },
      pre_stress: { type: "scale", min: 1, max: 10 },
      pre_anxiety: { type: "scale", min: 0, max: 10 },
      pre_guilt: { type: "scale", min: 0, max: 10 },
      pre_brain_fog: { type: "scale", min: 0, max: 10 },
      pre_mental_clarity: { type: "scale", min: 1, max: 10 },
      post_mood: { type: "scale", min: 1, max: 10 },
      post_energy: { type: "scale", min: 1, max: 10 },
      post_stress: { type: "scale", min: 1, max: 10 },
      post_anxiety: { type: "scale", min: 0, max: 10 },
      post_guilt: { type: "scale", min: 0, max: 10 },
      post_brain_fog: { type: "scale", min: 0, max: 10 },
      post_mental_clarity: { type: "scale", min: 1, max: 10 },
      orgasm_quality: { type: "scale", min: 1, max: 10 },
      regret_level: { type: "scale", min: 0, max: 10 },
      context_note: { type: "textarea" }
    }
  },

  work_session: {
    label: "Work Session",
    fields: {
      timestamp_start: { type: "datetime", required: true },
      timestamp_end: { type: "datetime" },
      duration_minutes: { type: "number" },
      task_type: { type: "select", options: ["professional","personal","academic","freelance","creative","admin","other"] },
      task_name: { type: "text", required: true },
      project: { type: "text" },
      session_description: { type: "textarea" },
      focus_level: { type: "scale", min: 1, max: 10 },
      output_score: { type: "scale", min: 1, max: 10 },
      distraction_count: { type: "number" },
      distraction_description: { type: "textarea" },
      pauses: {
        type: "array", label: "Pauses",
        itemFields: {
          pause_start_minutes: { type: "number", label: "Start (min into session)" },
          pause_end_minutes: { type: "number", label: "End (min into session)" },
          duration_minutes: { type: "number" },
          reason: { type: "text" }
        }
      },
      total_pause_minutes: { type: "number" },
      total_productive_minutes: { type: "number", label: "Total Productive Time (mins)" },
      mental_energy: { type: "scale", min: 1, max: 10 },
      physical_energy: { type: "scale", min: 1, max: 10 },
      clarity: { type: "scale", min: 1, max: 10 },
      motivation: { type: "scale", min: 1, max: 10 },
      confidence: { type: "scale", min: 1, max: 10 },
      tiredness: { type: "scale", min: 1, max: 10 },
      frustration: { type: "scale", min: 0, max: 10 },
      stress: { type: "scale", min: 0, max: 10 },
      sleepiness: { type: "scale", min: 0, max: 10 },
      location: { type: "select", options: ["work room","bedroom","living room","office","cafe","library","other"] },
      session_quality: { type: "scale", min: 1, max: 10 }
    }
  }
};
